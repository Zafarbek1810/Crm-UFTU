import Head from 'next/head'
import WithAuthComponent from '../../src/Hocs/PrivateRoute'
import DashboardLayout from '../../src/Components/DashLayout'
import Students from '../../src/Components/Pages/Dashboard/Students'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Talabalar</title>
                <meta name="description" content="Ushbu bo'lim Ufa fan va texnologiyalar universiteti uchun talabalar va abituriyentlarni ro'yxatini shakillantirish va saqlash uchun ishlab chiqilgan" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <Students />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
