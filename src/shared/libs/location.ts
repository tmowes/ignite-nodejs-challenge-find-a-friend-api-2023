import axios from 'axios'
import { convertToTitle } from '#shared/helpers/convertToTitle'

interface BrasilStateResponse {
  name: string
}

interface BrasilCityResponse {
  nome: string
  codigo_ibge: string
}

interface BrasilCityProps {
  name: string
  code: string
}

interface GeoLocationProps {
  address: string
  city: string
  coordinates: {
    longitude: string
    latitude: string
  }
}

export async function getBrasilStates() {
  const { data } = await axios.get<BrasilStateResponse>('https://brasilapi.com.br/api/ibge/uf/v1')
  return data
}

export async function getBrasilCitiesByState(UFCode: string): Promise<BrasilCityProps[]> {
  const { data } = await axios.get<BrasilCityResponse[]>(
    `https://brasilapi.com.br/api/ibge/municipios/v1/${UFCode}`,
  )
  return data.map(({ nome, codigo_ibge }) => ({
    name: convertToTitle(nome),
    code: codigo_ibge,
  }))
}

export async function getGeoLocationByCEP(cep: string): Promise<GeoLocationProps> {
  const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)

  return {
    address: data.street,
    city: data.city,
    coordinates: {
      latitude: data.location.coordinates.latitude,
      longitude: data.location.coordinates.longitude,
    },
  }
}
