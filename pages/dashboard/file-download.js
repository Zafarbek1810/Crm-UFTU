import Head from 'next/head'
import WithAuthComponent from '../../src/Hocs/PrivateRoute'
import DashboardLayout from '../../src/Components/DashLayout'
import AddStudent from '../../src/Components/Pages/Dashboard/Students/AddStudent'
import { useRouter } from 'next/router'
import FileDownload from '../../src/Components/Pages/Dashboard/Students/FileDownload'

export default function Home() {
    const router = useRouter();
    const id = router.query.id;


    return (
        <div>
            <Head>
                <title>Talabalarga file biriktirish</title>
                <meta name="description" content="Ushbu bo'lim Ufa fan va texnologiyalar universiteti uchun talabalar va abituriyentlarni ro'yxatini shakillantirish va saqlash uchun ishlab chiqilgan" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <FileDownload id={id}/>
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
