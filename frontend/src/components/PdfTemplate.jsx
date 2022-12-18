import React from 'react'

function PdfTemplate({ setVisiblePdf }) {
  return (
    <div className="blur">
      <div className="container-pdf">
        <i className="exit_icon" onClick={() => setVisiblePdf(false)}>
          x
        </i>
        <div className="content-pdf"></div>
        <div className="button-row">
          <button>Emite</button>
        </div>
      </div>
    </div>
  )
}

export default PdfTemplate
