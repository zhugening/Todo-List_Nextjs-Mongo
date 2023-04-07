import Head from 'next/head'
import { BiPlusMedical, BiX , BiCheck} from 'react-icons/bi'
import Table from '../components/table'
import Form from '../components/form'
import Form_track from '../components/form_track'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, deleteAction } from '../redux/reducer'
import { deleteWork, getWorks } from '../lib/helper'
import { useQueryClient } from 'react-query'
import Footer from '../components/footer'



export default function Home() {
  const visible = useSelector((state)=> state.app.client.toggleForm)
  const trackId = useSelector(state => state.app.client.trackId)
  const deleteId = useSelector(state => state.app.client.deleteId)
  const queryclient = useQueryClient();
  // const [tracks, setTracks] = useState(true)


  const dispatch = useDispatch()

  
  const handler = () => {
    // console.log("on click Work")
    dispatch(toggleChangeAction())
   
  }

  const deletehandler = async () => {
    if(deleteId){
      await deleteWork(deleteId);
      await queryclient.prefetchQuery('works',getWorks)
      await dispatch(deleteAction(null))
    }
  }

  const cancelhandler = async () =>{
    // console.log('cancel')
    await dispatch(deleteAction(null))
  }

  return (
    <section>
      <Head>
        <title>Update Claim Tracking by หวบม-ส.</title>
        <meta name="description" content="create by Wutthipan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='py-5'>
        <h1 className='text-xl md:text-5xl text-center font-bold py-10'>
          Update Claim Tracking by หวบม-ส.
        </h1>
        <div className='mt-10 mb-5 container mx-auto flex justify-between py-5 border-b'>
          <div className='left flex gap-3'>
            <button onClick={handler} className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-800'>
            ADD YOUR CLAIM <span className='px-1'><BiPlusMedical size={23}></BiPlusMedical></span>
            </button>
          </div>
          { deleteId? DeleteComponent({deletehandler, cancelhandler}):<></> }
          </div>
            {/* Solution 1 */}
            {/* {visible ?<Form></Form>: <></>} */}
            
            {/* Solution 2 */}
            {visible ?<Form></Form>
            :trackId ?<Form_track></Form_track> :<></>}
        
        <div className='container mx-auto content-center'>
          <Table></Table>
          </div>
          <Footer/>
      </main>
      </section>
      
  )
}


function DeleteComponent({deletehandler, cancelhandler}){
  return (
    <div className='flex gap-5'>
      <button>Are you sure ?</button>
      <button onClick={deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>
        Yes<span className='px-1'><BiX color='rgb(255 255 255)' size={25}/></span></button>
      <button onClick={cancelhandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-red-500 hover:text-gray-50'>
        No<span className='px-1'><BiCheck color='rgb(255 255 255)' size={25}/></span></button>
    </div>
  )
}

