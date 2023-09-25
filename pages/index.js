import Head from 'next/head'
import Login from '../src/Components/Pages/Login'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ufa fan va texnologiyalar universiteti CRM bo`limi</title>
        <meta name="description" content="Ushbu bo'lim Ufa fan va texnologiyalar universiteti uchun talabalar va abituriyentlarni ro'yxatini shakillantirish va saqlash uchun ishlab chiqilgan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Login/>
    </div>
  )
}
