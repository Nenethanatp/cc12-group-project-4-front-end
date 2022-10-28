function Modal({ open, content, close }) {
  return (
    <>
      {open && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex items-end z-50"
          onClick={close}
        >
          <div
            className="h-[70%] w-screen fadein overflow-auto"
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
