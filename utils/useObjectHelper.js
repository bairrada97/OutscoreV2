
export default function () {
    const setObjectKey = (object, key) => object[key] = object[key] || new Set();

    const getObjectKey = (object,key) => {
        return object[key]
    }
	return {
		setObjectKey,
        getObjectKey
	};
}
 