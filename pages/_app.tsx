import Provider from '../provider/Provider'
import '../styles/globals.css'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
