import Head from 'next/head'
import { BiX , BiCheck} from 'react-icons/bi'
import Form from '../components/form'
import Form_track from '../components/form_track'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, deleteAction , trackAction  } from '../redux/reducer'
import { deleteWork, getWorks } from '../lib/helper'
import { useQueryClient } from 'react-query'
import ShowTable from '../components/show_tracking'
import Link from 'next/link'



export default function Home() {
  const visible = useSelector((state)=> state.app.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId)
  const queryclient = useQueryClient();
//   const formId = useSelector((state)=> state.app.client.formId)
  const dispatch = useDispatch()

  // Check window 
  if (typeof window !== 'undefined') {
    // 👉️ can use window here
    console.log('You are on the browser')
  
    console.log(window.location.href);
  
    console.log(window.location.protocol);

    const queryString = window.location.href;
    const params = new URLSearchParams(queryString); 
    const IdFromURL = params.get('formId');
    console.log(IdFromURL)
  }

  // it's work only urlsearch
//   var queryString = window.location.href
//   var url = new URLSearchParams(queryString)
//   var id = url.toString().slice(-24);
//   console.log(id)
//   console.log(typeof(id))


//   const queryString = window.location.href;
//   const params = new URLSearchParams(queryString); 
//   const IdFromURL = params.get('formId');

//   console.log("this is URL",queryString)
//   console.log("this is IdFromURL",IdFromURL)

//   props is not define
//   const search = window.location.search; 
//   const isBrowser = () => {
//     if (typeof window !== 'undefined'){
//         const queryString = window.location.search;
//         const params = new URLSearchParams(queryString); 
//         const IdFromURL = params.get('formId');
//     } else {
//         const IdFromURL = '6412869ec33da787949e0310'
//     } 
// };


  
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
      <div>
        <title>Claim Tracking Table</title>
        <meta name="description" content="create by Wutthipan" />
        <link rel="icon" href="/favicon.ico" />
        <Link className='bg-violet-900 hover:bg-violet-500 text-xl text-white font-bold py-3 px-5 rounded-full'
            href ='/'
            >Back Home</Link>
      </div>

      <main className='py-5'>
        <h1 className='text-xl md:text-5xl text-center font-bold py-10'>
          Claim Tracking Table
        </h1>
        <div className='mt-10 mb-5 container mx-auto flex justify-between py-5 border-b'>
          <div className='left flex gap-3'>
            {/* <button onClick={handler} className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-800'>
            ADD YOUR CLAIM <span className='px-1'><BiPlusMedical size={23}></BiPlusMedical></span>
            </button> */}
          </div>
          { deleteId? DeleteComponent({deletehandler, cancelhandler}):<></> }
          </div>
            {/* Solution 1 */}
            {visible ?<Form></Form>: <></>}
            
            {/* Solution 2 */}
            {/* {visible ?<Form></Form>
            :trackId ?<Form_track></Form_track> :<></>} */}
        
        <div className='container mx-auto content-center'>
          {/* <ShowTable></ShowTable> */}
          {/* how to map formId */}
          <ShowTable
          formId ={"642856cf0473c132e638fa93"}/>
          {/* <ShowTable /> */}
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