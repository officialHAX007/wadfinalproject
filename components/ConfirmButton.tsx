
'use client'
export default function ConfirmButton({ children, onConfirm, className }:{ children: React.ReactNode, onConfirm: ()=>void, className?: string }){
  return (
    <button className={`btn btn-outline ${className||''}`} onClick={()=>{
      if (confirm('Are you sure? This cannot be undone.')) onConfirm()
    }}>{children}</button>
  )
}
