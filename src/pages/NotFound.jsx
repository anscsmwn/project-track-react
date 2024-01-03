const NotFoundPage = () => {
  const handleBackToHome = () => {}
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="mb-4"></div>
        <h1 className="text-2xl font-semibold mb-2">Halaman tidak ditemukan</h1>
        <p className="mb-3 text-gray-600 max-w-sm">
          Entah halaman ini tidak ada atau Anda tidak memiliki izin untuk
          mengaksesnya.
        </p>
        <button
          className="bg-blue-500 text-white px-4 text-sm py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={handleBackToHome}
        >
          Kembali ke konten saya
        </button>
        <hr className="my-6 border-t border-gray-300" />
        <p className="text-gray-500">
          Anda sedang masuk sebagai{' '}
          <span className="text-gray-700">user@example.com</span>
        </p>
        <p className="text-gray-500">
          Anda mungkin perlu masuk dengan email yang berbeda.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
