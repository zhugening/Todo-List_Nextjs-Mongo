import Head from 'next/head'
import { BiX , BiCheck} from 'react-icons/bi'
import Form_Edit from '../components/form_edit'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, deleteAction , trackAction  } from '../redux/reducer'
import { deleteWork, deleteTrackWork, getWorks } from '../lib/helper'
import { useQueryClient, useQuery } from 'react-query'
import ShowTable from '../components/show_tracking'
import Link from 'next/link'
import { useState } from 'react'
import Success from "../components/success"



export default function Home() {
  const visible = useSelector((state)=> state.app.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId)
  const queryclient = useQueryClient();
  const [isSuccess, setIsSucess] = useState(false)
  const dispatch = useDispatch()
  
  // function check 'undefined'
  function check_window(){
    let queryString = ''
    let url = ''
    let id = ''
    if (typeof window !== 'undefined') {
      // console.log(window.location.href)
      queryString = window.location.href
      url = new URLSearchParams(queryString)
      id = url.toString().slice(-24);
      return id
    } else {
      return id = "null"
    }
  }
  const formId = check_window()
  const { isLoading, isError, data, error } = useQuery(['works', formId],()=> getWork({formId}))
  const device_number = data?.['device_no']
  const claim_number = data?.['claim_no']
  const contract_number = data?.['contract_no']
  const egat_number = data?.['egat_sn']
  const status_claim = data?.['status']
  const part = data?.['equipment']
  const claim_booking_number = data?.['claim_booking']


  
  const deletehandler = async () => {
    if(deleteId && formId){
      // await Works.updateOne({_id: formId}, {
      //   $pull : {
      //     update : { _id: deleteId}
      //   }
      // })
      await deleteTrackWork(formId,deleteId);
      await queryclient.prefetchQuery('works',getWorks)
      setIsSucess(true)
      // await dispatch(deleteAction(null))
      window.location.reload()
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
        {/* Solution 1 */}
        {/* <button className='mt-5 bg-violet-900 hover:bg-violet-500 text-bold text-white px-10 py-4 rounded-full'>
          Back {}
          {<Link
            href ='/'
            >Home</Link>}
          </button> */}

        {/* Solution 2 */}
        
        {/* <button className='mt-5 flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-800 px-10 py-4 rounded-full'></button> */}
        <Link className = ''
        href ='/'
        >
          <button className='cursor flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-800'>Back Home</button></Link>

      </div>

      <main className='py-5'>
        <h1 className='text-xl md:text-5xl text-center font-bold py-10 hover:text-red-500'>
          Claim Tracking Table ติดตามสถานะงานเคลม
        </h1>

        <form className="grid lg:grid-cols-4 w-4/6 gap-4 container mx-auto content-center text-center" >
            <div className="input-type">
                <div className={`${
                  status_claim == "InActive" ? "bg-red-400 ":
                  status_claim == "InProgress" ? "bg-yellow-500 ":
                  status_claim == "InComplete" ? "bg-green-500 ":""
                }border w-full px-5 py-3 focus:outline-none text-white`}>{claim_number}</div>
            </div>

            <div className="input-type">
                <div className={`${
                  status_claim == "InActive" ? "bg-red-400 ":
                  status_claim == "InProgress" ? "bg-yellow-500 ":
                  status_claim == "InComplete" ? "bg-green-500 ":""
                }border w-full px-5 py-3 focus:outline-none text-white`}>{contract_number}</div>
            </div>

            <div className="input-type">
                <div className={`${
                  status_claim == "InActive" ? "bg-red-400 ":
                  status_claim == "InProgress" ? "bg-yellow-500 ":
                  status_claim == "InComplete" ? "bg-green-500 ":""
                }border w-full px-5 py-3 focus:outline-none text-white`}>{egat_number}</div>
            </div>

            <div className="input-type">
                <div className={`${
                  status_claim == "InActive" ? "bg-red-400 ":
                  status_claim == "InProgress" ? "bg-yellow-500 ":
                  status_claim == "InComplete" ? "bg-green-500 ":""
                }border w-full px-5 py-3 focus:outline-none text-white`}>{claim_booking_number}</div>
            </div>

            <div className="input-type">
                <div className={`${
                  status_claim == "InActive" ? "bg-red-400 ":
                  status_claim == "InProgress" ? "bg-yellow-500 ":
                  status_claim == "InComplete" ? "bg-green-500 ":""
                }border w-full px-5 py-3 focus:outline-none text-white`}>{device_number}</div>
            </div>

            <div className="input-type">
                <div className={`${
                  status_claim == "InActive" ? "bg-red-400 ":
                  status_claim == "InProgress" ? "bg-yellow-500 ":
                  status_claim == "InComplete" ? "bg-green-500 ":""
                }border w-full px-5 py-3 focus:outline-none text-white`}>{part}</div>
            </div>

            <div className="input-type">
                <div className={`${
                  status_claim == "InActive" ? "bg-red-400 ":
                  status_claim == "InProgress" ? "bg-yellow-500 ":
                  status_claim == "InComplete" ? "bg-green-500 ":""
                }border w-full px-5 py-3 focus:outline-none text-white`}>{status_claim}</div>
            </div>

            
            </form>

        {/* {visible ?<Form></Form>: <></>} */}
        {(isSuccess !== false)?<Success message={"Deleted tracking claim Successfully"}></Success>: <></>}
        
        <div className='mt-10 mb-5 container mx-auto flex justify-between py-5 border-b'>
          <div className='left flex gap-3'>
            {/* <button onClick={handler} className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-800'>
            ADD YOUR CLAIM <span className='px-1'><BiPlusMedical size={23}></BiPlusMedical></span>
            </button> */}
          </div>
          { deleteId? DeleteComponent({deletehandler, cancelhandler}):<></> }
          </div>
            {/* Solution 1 */}
            {visible ?<Form_Edit></Form_Edit>: <></>}
            
            {/* Solution 2 */}
            {/* {visible ?<Form></Form>
            :trackId ?<Form_track></Form_track> :<></>} */}
        
        <div className='container mx-auto content-center'>
          {/* <ShowTable></ShowTable> */}
          {/* how to map formId */}
          
          <ShowTable
          formId = {formId}/>

          {/* {visible?<ShowTable formId = {formId}/> : <></>} */}
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