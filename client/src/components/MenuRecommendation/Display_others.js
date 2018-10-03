import React from 'react';

const DisplayOthers = props => {

    const { name, file, price } = props.menuItems;

    const src = `../images/${ file }`;

    const ids = `#${ name }`;

    return (

        <section className="border border-success">

            <div>
                <img 
                    style = {{width:'220px', height:'150px'}}
                    className="img img-fluid img-thumbnail mt-3" 
                    alt="Responsive img" 
                    src = { src }  
                    
                />
            </div>


            <div className="text-info mb-1"> Price: ${ price } </div>

            <div>
                <a href={ ids } 
                    className="orderStart font-weight-bold border border-info"
                >
                    <span data-text="S">S</span>
                    <span data-text="T">T</span>
                    <span data-text="A">A</span>
                    <span data-text="R">R</span>
                    <span data-text="T" className="pr-2">T</span>
                    <span data-text="O">O</span>
                    <span data-text="R">R</span>
                    <span data-text="D">D</span>
                    <span data-text="E">E</span>
                    <span data-text="R">R</span>
                </a>
            
            </div>
 
        </section>

    );
        
}

export default DisplayOthers;