import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  // Mengambil path dari URL saat ini
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // Pecah path berdasarkan '/'

  // Fungsi untuk memformat teks menjadi lebih ramah (mengubah "%20" menjadi spasi, dan kapitalisasi)
  const formatText = (text) => {
    return decodeURIComponent(text) // Mengubah %20 menjadi spasi
      .replace(/-/g, ' ') // Mengubah tanda '-' menjadi spasi
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi setiap kata
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrum flex flex-row">
        {pathnames.length === 0 ? (
          // Jika pathnames kosong (Home), hanya tampilkan 'Home'
          <li className="breadcrumb-item active" aria-current="page">
            Home
          </li>
        ) : (
          <>
            {/* Bagian Home */}
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            {/* Tampilkan bagian lain dengan pemisah '/' */}
            {pathnames.map((value, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;

              return (
                <React.Fragment key={routeTo}>
                  <span className="separator"> / </span>
                  {isLast ? (
                    <li className="breadcrumb-item active" aria-current="page">
                      {formatText(value)}
                    </li>
                  ) : (
                    <li className="breadcrumb-item">
                      <Link to={routeTo}>{formatText(value)}</Link>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
