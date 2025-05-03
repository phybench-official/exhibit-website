import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useTranslation } from 'react-i18next'

function App() {
  const [count, setCount] = useState(0)
  const { t } = useTranslation("common")

  return (
    <>
      <div className="pt-32">
        <a href="https://vite.dev" target="_blank" rel='noreferrer'>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel='noreferrer'>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{t('app.welcome')}</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          {t('app.count', { count: count })}
        </button>
        <p>
          {t('app.edit')}
        </p>
      </div>
      <p className="read-the-docs">
        {t('app.readTheDocs')}
      </p>
    </>
  )
}

export default App
