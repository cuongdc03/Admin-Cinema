interface ModalConfirmProps {
  showModal: boolean
  onCancel: () => void
  onConfirm: () => void
  heading: string
  desc: string
  confirmBtnTitle: string
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  showModal,
  onCancel,
  onConfirm,
  heading,
  desc,
  confirmBtnTitle
}) => {
  return (
    <div
      className={`fixed left-0 top-0 z-9999 h-[100vh] w-[100vw] bg-black/80 ${showModal ? 'block' : 'hidden'}`}
      onClick={onCancel}
    >
      <div className='fixed inset-0 flex items-center justify-center'>
        <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>
          <h2 className='mb-4 text-lg font-bold'>{heading}</h2>
          <p className='text-gray-600 mb-4'>{desc}</p>
          <div className='flex justify-between'>
            <button className='hover:bg-gray-500 rounded bg-blue-400 px-4 py-2 font-bold text-white' onClick={onCancel}>
              Cancel
            </button>
            <button className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700' onClick={onConfirm}>
              {confirmBtnTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm
