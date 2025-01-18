/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return children
}

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
