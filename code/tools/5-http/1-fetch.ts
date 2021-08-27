import qs from 'qs'

export interface BaseConfig {
  baseUrl: string
}

export interface Config extends RequestInit {
  data?: object
}

export const createHttp = (baseConfig: BaseConfig) => {
  const { baseUrl } = baseConfig
  const http = async <T = any>(
    endpoint: string,
    { data, headers, ...customConfig }: Config = {},
  ): Promise<T> => {
    const config: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': data ? 'application/json' : '',
        ...headers,
      },
      ...customConfig,
    }

    if (config.method.toUpperCase() === 'GET') {
      if (data) {
        endpoint += `?${qs.stringify(data)}`
      }
    } else {
      config.body = JSON.stringify(data || {})
    }

    endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    return window
      .fetch(`${baseUrl}${endpoint}`, config)
      .then(async response => {
        const data = await response.json()
        return response.ok ? Promise.resolve(data) : Promise.reject(data)
      })
  }
  return http
}
