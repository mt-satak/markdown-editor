import * as React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Editor } from './pages/editor'
import { History } from './pages/history'

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`

const Main = (
  <>
    <GlobalStyle />
    {/* Router: ルーティング範囲を定義 */}
    <Router>
      <Route exact={true} path="/editor">
        <Editor />
      </Route>

      <Route exact={true} path="/history">
        <History />
      </Route>
      {/* 定義されていないパスの場合は/editorにリダイレクトする */}
      <Redirect to="/editor" path="*" />
    </Router>
  </>
)

render(Main, document.getElementById('app'))