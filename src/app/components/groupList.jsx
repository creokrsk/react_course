import React from "react";
import PropTypes from "prop-types";

function GroupList({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem,
}) {
    // console.log(items);
    if (Array.isArray(items)) {
        return (
            <>
                <ul className="list-group">
                    {items.map((item) => (
                        <li
                            key={item[valueProperty]}
                            className={`list-group-item + ${
                                item === selectedItem ? "active" : ""
                            }`}
                            onClick={() => onItemSelect(item)}
                            role="button"
                        >
                            {item[contentProperty]}
                        </li>
                    ))}
                </ul>
            </>
        );
    } else {
        return (
            <ul className="list-group">
                {Object.keys(items).map((item) => (
                    <li
                        key={items[item][valueProperty]}
                        className={
                            "list-group-item" +
                            (items[item] === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemSelect(items[item])}
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
            </ul>
        );
    }
}

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name",
};

GroupList.propTypes = {
    // items: PropTypes.object.isRequired,
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
};

export default GroupList;
