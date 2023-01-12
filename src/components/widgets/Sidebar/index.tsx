import { CategoryManagement, Dashboard, Editor, FriendsCircle, GithubOne, HomeTwo, Logout, MenuFoldOne, MenuUnfoldOne, OpenDoor, Page, Write } from "@icon-park/react"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Space } from "../../universal/Space"
import styles from "./index.module.css"
import { SidebarItem } from "./item"
import { motion } from 'framer-motion'
import { getStorage, removeStorage, setStorage } from "../../../utils/storage"
import { useWindowSize } from "react-use"
import itemStyle from './item/index.module.css'

const Links = () => {
  return (
    <div className={styles.links}>
      <SidebarItem
        icon={HomeTwo({})}
        title="仪表盘"
        href="/dashboard"
      />
      <SidebarItem
        icon={Page({})}
        title="前往站点"
        href="https://github.com"
        outside
      />
      <Space
        height={20}
      />
      <SidebarItem
        icon={Editor({})}
        title="文章"
        href="/posts"
      />
      <SidebarItem
        title="写文章"
        href="/write/post"
        sub
        // naive
      />
      <SidebarItem
        title="朋友动态"
        href="/posts/friends"
        sub
      />
      <Space
        height={20}
      />
      <SidebarItem
        icon={OpenDoor({})}
        title="页面"
        href="/pages"
      />
      <SidebarItem
        title="新增页面"
        href="/write/page"
        sub
        // naive
      />
      <Space
        height={20}
      />
      <SidebarItem
        icon={CategoryManagement({})}
        title="分类标签"
        href="/categories"
      />
      <SidebarItem
        icon={FriendsCircle({})}
        title="朋友们"
        href="/friends"
      />
      <Space
        height={20}
      />
      <SidebarItem
        icon={Dashboard({})}
        title="服务状态"
        href="/status"
      />
      <SidebarItem
        icon={GithubOne({})}
        title="前往文档"
        href="https://github.com"
        outside
      />
      <Space
        height={30}
      />
      <span className={itemStyle.item}
        onClick={() => {
          removeStorage('token')
          window.location.href = '/login'
        }}
      >
        <div className={itemStyle.icon}>
          <Logout />
        </div>
        <div className={itemStyle.title}>
          退出登录
        </div>
      </span>
    </div>
  )
}

export const Sidebar: React.FC = () => {
  const [float, setFloat] = useState(getStorage('sidebarFloat') === "true" || false)
  const [isMobile, setIsMobile] = useState(false)
  const [x, setX] = useState(0)
  const { width } = useWindowSize()


  function setXEnterByFloat() {
    if (float) setX(0)
  }
  function setXLeaveByFloat() {
    if (float) setX(-300)
  }

  useEffect(() => {
    setStorage('sidebarFloat', String(float))
  }, [float])

  useEffect(() => {
    if (width < 768) {
      setFloat(true)
      setIsMobile(true)
      setX(-300)
    }
  }, [width])
  return (
    <>
      <motion.div
        className={clsx(
          styles.sidebar,
          float && styles.float
        )}
        initial={{ x: -300 }}
        animate={{ x }}
        transition={{
          type: "spring",
          duration: 0.2,
          bounce: 0.5,
          damping: 15,
        }}
        onMouseEnter={setXEnterByFloat}
        onMouseLeave={setXLeaveByFloat}
        onTouchStart={setXEnterByFloat}
        onTouchEnd={setXLeaveByFloat}
      >
        <div className={clsx(styles.header)} >
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              Mog
            </div>
            <div
              className={styles.search}
              onClick={() => setFloat(!float)}
            >
              {
                !isMobile && (float ? <MenuFoldOne /> : <MenuUnfoldOne />)
              }
            </div>
          </div>
        </div>
        <div className={styles.inner}>
          <Links />
        </div>
      </motion.div>
    </>
  )
}