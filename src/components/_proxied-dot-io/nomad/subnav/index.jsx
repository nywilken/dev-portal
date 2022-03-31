import { useEffect, useState } from 'react'
import Subnav from '@hashicorp/react-subnav'
import productData from 'data/nomad'
import { useRouter } from 'next/router'

export default function NomadSubnav({ menuItems }) {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState()

  useEffect(() => {
    setCurrentPath(router.asPath)
  }, [router.asPath])

  return (
    <Subnav
      titleLink={{
        text: 'HashiCorp Nomad',
        url: '/',
      }}
      ctaLinks={[
        { text: 'GitHub', url: 'https://www.github.com/hashicorp/nomad' },
        { text: 'Download', url: '/downloads', theme: { brand: 'nomad' } },
      ]}
      currentPath={currentPath}
      menuItemsAlign="right"
      menuItems={menuItems}
      constrainWidth
      matchOnBasePath
    />
  )
}
