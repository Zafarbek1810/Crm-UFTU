import Head from 'next/head'
import WithAuthComponent from '../../src/Hocs/PrivateRoute'
import DashboardLayout from '../../src/Components/DashLayout'
import Faculties from '../../src/Components/Pages/Dashboard/Faculties'
import AddMemo from '../../src/Components/Pages/Dashboard/Students/AddMemo'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <Head>
                <title>Eslatmalar</title>
                <meta name="description" content="Ushbu bo'lim Ufa fan va texnologiyalar universiteti uchun talabalar va abituriyentlarni ro'yxatini shakillantirish va saqlash uchun ishlab chiqilgan" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
                <AddMemo id={id} />
        </div>
    )
}
