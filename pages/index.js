import Head from 'next/head'
import { BiPlusMedical } from 'react-icons/bi'
import Table from '../components/table'
import Form from '../components/form'
import { useState } from 'react'

export default function Home() {

  const [visible, setVisible] = useState(false)

  const handler = () => {
    setVisible(!visible)
    // setVisible(visible?false : true)
  }

  return (
    <section>
      <Head>
        <title>TODO list Transformer & wkorkshop Departmennt Application</title>
        <meta name="description" content="create by Wutthipan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='py-5'>
        <h1 className='text-xl md:text-5xl text-center font-bold py-10'>
          Application Work tracking For Transformer & Workshop Departments
        </h1>
        <div className='container mx-auto flex justify-between py-5 border-b'>
          <div className='left flex gap-3'>
            <button onClick={handler} className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-800'>
            ADD WORK <span className='px-1'><BiPlusMedical size={23}></BiPlusMedical></span>
            </button>
          </div>
          </div>
          {/* form */}
            {visible ?<Form></Form>: <></>}
         
          

          {/* table */}
        
        <div className='container mx-auto'>
          <Table></Table>
        </div>
      </main>
      </section>
  )
}
