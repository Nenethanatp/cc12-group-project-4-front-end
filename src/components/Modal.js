function Modal({ open, content, close }) {
  return (
    <>
      {open && (
        <div
          className='fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex items-end'
          onClick={close}
        >
          <div
            className='bg-white w-[100vw] h-[70%] p-5 flex justify-center fadein overflow-auto'
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
