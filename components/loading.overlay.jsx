import { Spinner } from "@chakra-ui/react"

const LoadingOverlay = ({ isLoading = false }) => {

  return (
    <>
      {isLoading && (
        <div className="overlay">
          <div className="overlay__inner">
            <div className="overlay__content">
              <Spinner
                thickness="6px"
                speed="0.7s"
                emptyColor="gray.200"
                color="blue.500"
                w={28}
                h={28}
              ></Spinner>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoadingOverlay
