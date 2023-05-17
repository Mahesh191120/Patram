import React from 'react'
import Popup from 'reactjs-popup';

const EmailRemainder = () => {
  return (<div>
    <h4>Popup - GeeksforGeeks</h4>
    <Popup trigger=
        {<button> Click to open modal </button>}
        modal nested>
        {
            close => (
                <div className='modal' style={{marginTop:"600px"}}>
                    <div className='content' >
                        Welcome to GFG!!!
                    </div>
                    <div>
                        <button onClick=
                            {() => close()}>
                                Close modal
                        </button>
                    </div>
                </div>
            )
        }
    </Popup>
</div>
  )
}

export default EmailRemainder