import Head from 'next/head'
import { BiPlusMedical, BiX , BiCheck} from 'react-icons/bi'
import Table from '../components/table'
import Claim_Table from '../components/claimTable'
import Form from '../components/form'
import Claim_Form from '../components/claim_form'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, deleteAction } from '../redux/reducer'
import { claim_toggleChangeAction, claim_deleteAction } from '../redux/claim_reducer'
import { deleteWork, getWorks } from '../lib/helper'
import { deleteClaim, getClaims } from '../lib/claim_helper'
import { useQueryClient } from 'react-query'

export default function Home() {

  // const [visible, setVisible] = useState(false)
  const visible = useSelector((state)=> state.app.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId)
  const queryclient = useQueryClient();


  const dispatch = useDispatch()
  
  const handler = () => {
    dispatch(toggleChangeAction())
    // setVisible(!visible)
    // setVisible(visible?false : true)
  }

  const claim_handler = () =>{
    dispatch(claim_toggleChangeAction())
  }

  const deletehandler = async () => {
    if(deleteId){
      await deleteWork(deleteId);
      await queryclient.prefetchQuery('works',getWorks)
      await dispatch(claim_deleteAction(null))
    }
  }

  const claim_deletehandler = async () => {
    if(deleteId){
      await deleteClaim(deleteId);
      await queryclient.prefetchQuery('claims',getClaims)
      await dispatch(deleteAction(null))
    }
  }

  const cancelhandler = async () =>{
    console.log('cancel')
    await dispatch(deleteAction(null))
  }

  const claim_cancelhandler = async () =>{
    console.log('cancel')
    await dispatch(claim_deleteAction(null))
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
        <div className='ml-5 container mx-auto flex justify-between py-5 border-b'>
          <div className='left flex gap-3'>
            <button onClick={handler} className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-800'>
            ADD YOUR CLAIM <span className='px-1'><BiPlusMedical size={23}></BiPlusMedical></span>
            </button>
          </div>
          {/* {DeleteComponent({deletehandler, cancelhandler})} */}
          { deleteId? DeleteComponent({deletehandler, cancelhandler}):<></> }
          </div>
          {/* form */}
            {visible ?<Form></Form>: <></>}
         
          

          {/* table */}
        
        <div className='container mx-auto content-center'>
          <Table></Table>
          <div className='mt-10 mb-5 text-lg text-red-800 font-bold'>Claim Table</div>
          <div className='left flex gap-3'>
            <button onClick={claim_handler} className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-800'>
            ADD CLAIM TRACKING <span className='px-1'><BiPlusMedical size={23}></BiPlusMedical></span>
            </button>
            { deleteId? Claim_DeleteComponent({claim_deletehandler, claim_cancelhandler}):<></> }
          </div>
          {/* form */}
            {visible ?<Claim_Form></Claim_Form>: <></>}
          
          <Claim_Table></Claim_Table>
          </div>
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

function Claim_DeleteComponent({claim_deletehandler, claim_cancelhandler}){
  return (
    <div className='flex gap-5'>
      <button>Are you sure ?</button>
      <button onClick={claim_deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>
        Yes<span className='px-1'><BiX color='rgb(255 255 255)' size={25}/></span></button>
      <button onClick={claim_cancelhandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-red-500 hover:text-gray-50'>
        No<span className='px-1'><BiCheck color='rgb(255 255 255)' size={25}/></span></button>
    </div>
  )
}

