import waypointData from 'data/waypoint.json'
import { ProductData } from 'types/products'
import ProductLandingView from 'views/product-landing'
import { generateGetStaticProps } from 'views/product-landing/server'

const getStaticProps = generateGetStaticProps(waypointData as ProductData)

export { getStaticProps }
export default ProductLandingView
