import React, { PropsWithChildren } from 'react'
import { ProLayout } from '@ant-design/pro-components'
import { Divider, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { Outlet, Link, useLocation } from 'react-router-dom'

const items: MenuProps['items'] = [
  {
    label: <Link to="/">Shopify export</Link>,
    key: '/',
  },
  {
    label: <Link to="/shopbase">Shopbase export</Link>,
    key: '/shopbase',
  },
]

const MenuCard = () => {
  const location = useLocation()
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
      <Menu
        mode="horizontal"
        items={items}
        activeKey={location.pathname}
      ></Menu>
    </div>
  )
}

export const Default: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProLayout
      title="Generator Link"
      layout="top"
      headerTitleRender={(logo, title, _) => {
        const defaultDom = (
          <a>
            {logo}
            {title}
          </a>
        )
        return (
          <>
            {defaultDom}
            <MenuCard />
          </>
        )
      }}
    >
      <div className='flex items-center h-full'>
        <Outlet />
      </div>
    </ProLayout>
  )
}
