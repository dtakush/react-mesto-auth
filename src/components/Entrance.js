import React from 'react';

function Entrance(props) {
    return (
        <section className="entrance" name={props.name}>
            <h2 className="entrance__title">{props.title}</h2>
            <form
            className="entrance__form"
            id={`${props.name}-form`}
            onSubmit={props.onSubmit}>

                {props.children}

                <button
                className="entrance__submit"
                name="entrance__submit"
                type="submit"
                id="entrance__submit">{props.buttonTitle}</button>
            </form>
        </section>
    )
}

export default Entrance;