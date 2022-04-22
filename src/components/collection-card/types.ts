import type { ProductOption } from 'lib/learn-client/types'
import type { CompanyLogoOption } from './components/company-logo/types'

export interface CollectionCardProps {
  description: string
  heading: string
  productsUsed: ProductOption[]
  tutorialCount: number
  url: string
  logo?: CompanyLogoOption
}