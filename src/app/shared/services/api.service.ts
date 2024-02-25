import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParameterCodec,
  HttpParams,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

class ParameterCodec implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key)
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value)
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key)
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value)
  }
}

const ParameterCodecInstance = new ParameterCodec()

/**
 * Defines the options for appending a parameter
 */
interface ParameterOptions {
  style?: string
  explode?: boolean
}

/**
 * Base class for a parameter
 */
abstract class Parameter {
  constructor(
    public name: string,
    public value: any,
    public options: ParameterOptions,
    defaultStyle: string,
    defaultExplode: boolean
  ) {
    this.options = options || {}
    if (this.options.style === null || this.options.style === undefined) {
      this.options.style = defaultStyle
    }
    if (this.options.explode === null || this.options.explode === undefined) {
      this.options.explode = defaultExplode
    }
  }

  serializeValue(value: any, separator = ','): string {
    if (value === null || value === undefined) {
      return ''
    } else if (value instanceof Array) {
      return value
        .map((v) =>
          this.serializeValue(v)
            .split(separator)
            .join(encodeURIComponent(separator))
        )
        .join(separator)
    } else if (typeof value === 'object') {
      const array: string[] = []
      for (const key of Object.keys(value)) {
        let propVal = value[key]
        if (propVal !== null && propVal !== undefined) {
          propVal = this.serializeValue(propVal)
            .split(separator)
            .join(encodeURIComponent(separator))
          if (this.options.explode) {
            array.push(`${key}=${propVal}`)
          } else {
            array.push(key)
            array.push(propVal)
          }
        }
      }
      return array.join(separator)
    } else {
      return String(value)
    }
  }
}

/**
 * A parameter in the query
 */
class QueryParameter extends Parameter {
  constructor(name: string, value: any, options: ParameterOptions) {
    super(name, value, options, 'form', true)
  }

  append(params: HttpParams): HttpParams {
    if (this.value instanceof Array) {
      // Array serialization
      if (this.options.explode) {
        for (const v of this.value) {
          params = params.append(this.name, this.serializeValue(v))
        }
      } else {
        const separator =
          this.options.style === 'spaceDelimited'
            ? ' '
            : this.options.style === 'pipeDelimited'
            ? '|'
            : ','
        return params.append(
          this.name,
          this.serializeValue(this.value, separator)
        )
      }
    } else if (this.value !== null && typeof this.value === 'object') {
      // Object serialization
      if (this.options.style === 'deepObject') {
        // Append a parameter for each key, in the form `name[key]`
        for (const key of Object.keys(this.value)) {
          const propVal = this.value[key]
          if (propVal !== null && propVal !== undefined) {
            params = params.append(
              `${this.name}[${key}]`,
              this.serializeValue(propVal)
            )
          }
        }
      } else if (this.options.explode) {
        // Append a parameter for each key without using the parameter name
        for (const key of Object.keys(this.value)) {
          const propVal = this.value[key]
          if (propVal !== null && propVal !== undefined) {
            params = params.append(key, this.serializeValue(propVal))
          }
        }
      } else {
        // Append a single parameter whose values are a comma-separated list of key,value,key,value...
        const array: any[] = []
        for (const key of Object.keys(this.value)) {
          const propVal = this.value[key]
          if (propVal !== null && propVal !== undefined) {
            array.push(key)
            array.push(propVal)
          }
        }
        params = params.append(this.name, this.serializeValue(array))
      }
    } else if (this.value !== null && this.value !== undefined) {
      // Plain value
      params = params.append(this.name, this.serializeValue(this.value))
    }
    return params
  }
}

/**
 * A parameter in the HTTP request header
 */
class HeaderParameter extends Parameter {
  constructor(name: string, value: any, options: ParameterOptions) {
    super(name, value, options, 'simple', false)
  }

  append(headers: HttpHeaders): HttpHeaders {
    if (this.value !== null && this.value !== undefined) {
      if (this.value instanceof Array) {
        for (const v of this.value) {
          headers = headers.append(this.name, this.serializeValue(v))
        }
      } else {
        headers = headers.append(this.name, this.serializeValue(this.value))
      }
    }
    return headers
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private rootUrl: string = 'https://api.realworld.io/api/users'
  private _query = new Map<string, QueryParameter>()
  private _header = new Map<string, HeaderParameter>()
  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    const options = { params, headers }
    return this.http.get<T>(`${this.rootUrl}${url}`, options)
  }

  post<T>(url: string, body: any, responseType?: string): Observable<T> {
    const httpOptions: { headers: any; responseType: any } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType,
    }

    return this.http.post<T>(`${this.rootUrl}${url}`, body, httpOptions)
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    const options = { headers }
    return this.http.put<T>(`${this.rootUrl}${url}`, body, options)
  }

  delete<T>(
    url: string,
    options?: {
      /** Which content types to accept */
      accept?: string

      /** The expected response type */
      responseType?: 'json' | 'text' | 'blob' | 'arraybuffer' | undefined
      //   responseType?: string

      /** Whether to report progress on uploads / downloads */
      reportProgress?: boolean

      /** Allow passing HttpContext for HttpClient */
      context?: HttpContext
    }
  ): Observable<T> {
    options = options || {}

    // Query parameters
    let httpParams = new HttpParams({
      encoder: ParameterCodecInstance,
    })
    for (const queryParam of this._query.values()) {
      httpParams = queryParam.append(httpParams)
    }

    // Header parameters
    let httpHeaders = new HttpHeaders()
    if (options.accept) {
      httpHeaders = httpHeaders.append('Accept', options.accept)
    }
    for (const headerParam of this._header.values()) {
      httpHeaders = headerParam.append(httpHeaders)
    }

    return this.http.delete<T>(`${this.rootUrl}${url}`, {
      headers: httpHeaders,
      params: httpParams,
      context: options.context,
      observe: 'body',
      reportProgress: options.reportProgress,
      responseType: 'json', //error type text or others
      withCredentials: false,
      body: null,
    })
  }
}
