import Navbar from '../components/Navbar'
import Head from 'next/head'

type Props = {
  description: string
  title: string
  children: React.ReactNode
}

const MainLayout = ({ description, title, children }: Props) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width  ,initial-scale=1.0"
        />
        <meta name="description" content={description} />
        <title>{title}</title>
      </Head>
      <Navbar />

      <main>{children}</main>
    </>
  )
}

export default MainLayout
