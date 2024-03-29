import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    // click edit
    function handleClick(index,event) {

        let item = document.getElementById("item-" + (index+1));
        item.innerHTML = "";

        // ADD A TEXT FIELD 
        let textInput = document.createElement("input");
        textInput.setAttribute("type", "text");
        textInput.setAttribute("id", "item-text-input-" + index);
        textInput.setAttribute("value", store.currentList.items[index]);
        item.setAttribute("draggable", "false");

        item.appendChild(textInput);

        textInput.onclick = (event) => {
            event.stopPropagation();
        }
        textInput.onkeydown = (event) => {
            if (event.key === 'Enter') {
                let value = event.target.value;
                store.changeItemTransaction(index, value);
            }
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    return (
        <div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            <input
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                onClick={handleClick.bind(this,index)}// add a action on edit button
                value={"\u270E"}
            />
            {props.text}
        </div>)
}

export default Top5Item;
