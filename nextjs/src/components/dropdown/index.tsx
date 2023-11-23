import './style.css'

const Dropdown = () => {
  return (
    <>
      <div className="dropdown">
        <div
          className="dropdown-btn"
          data-testid="select"
        >
          Choose
          <span
            className={
             'fas fa-caret-up'
            }
          />
        </div>
        <div
          data-testid="content"
          className="dropdown-content"
          style={{ display: 'none' }}
        >
          <div
            className="item"
            data-testid="value"
          >
            8
          </div>
          <div
            className="item"
            data-testid="value"
          >
            12
          </div>
          <div
            className="item"
            data-testid="value"
          >
            16
          </div>
        </div>
      </div>
    </>
  )
}

export default Dropdown