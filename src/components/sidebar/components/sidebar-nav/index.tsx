import { useRouter } from 'next/router'
import { MenuItem } from 'components/sidebar'
import SidebarNavMenuItem from './sidebar-nav-menu-item'
import s from './style.module.css'

const SIDEBAR_LABEL_ID = 'sidebar-label'

interface SidebarNavProps {
  menuItems: MenuItem[]
  title: string
}

// TODO: this might be a helpful to abstract as a util? The name feels looong
const getCurrentPathWithoutParamsOrAnchors = (path: string): string => {
  const matches = path.match(/.+?(?=(#|\?))/)
  if (matches) {
    return matches[0]
  }

  return path
}

const addActiveStateMetadata = (currentPath: string, items: MenuItem[]) => {
  let foundActiveItem = false

  items.forEach((item) => {
    if (foundActiveItem) {
      item[item.routes ? 'hasActiveChild' : 'isActive'] = false
      return
    }

    if (item.routes) {
      foundActiveItem = addActiveStateMetadata(currentPath, item.routes)
      item.hasActiveChild = foundActiveItem
    } else {
      foundActiveItem = currentPath.endsWith(item.path)
      item.isActive = foundActiveItem
    }
  })

  return foundActiveItem
}

const SidebarNav: React.FC<SidebarNavProps> = ({ menuItems, title }) => {
  const router = useRouter()
  const currentPath = getCurrentPathWithoutParamsOrAnchors(router.asPath)

  addActiveStateMetadata(currentPath, menuItems)

  return (
    <nav aria-labelledby={SIDEBAR_LABEL_ID}>
      <p className={s.sidebarNavLabel} id={SIDEBAR_LABEL_ID}>
        {title}
      </p>
      <a className={s.skipToMainContent} href="#main">
        Skip to main content
      </a>
      <ul className={s.sidebarNavList} role="menubar">
        {menuItems.map((item, index) => (
          <SidebarNavMenuItem
            item={item}
            // TODO: come up with better alternative to index
            // eslint-disable-next-line react/no-array-index-key
            key={`sidebar-nav-menu-item-${index}`}
          />
        ))}
      </ul>
    </nav>
  )
}

export default SidebarNav
