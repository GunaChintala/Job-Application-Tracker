import { useEffect, useState } from "react"

function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {

        try {

            const savedValue =
                localStorage.getItem(key)

            if (savedValue) {
                return JSON.parse(savedValue)
            }

            return initialValue

        } catch (error) {

            console.error(
                "Failed to load from localStorage:",
                error
            )

            return initialValue
        }
    })

    useEffect(() => {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            )

        } catch (error) {

            console.error(
                "Failed to save to localStorage:",
                error
            )
        }

    }, [key, value])

    return [value, setValue]
}

export default useLocalStorage