import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { useEffect, memo, useCallback } from "react"

const ModalDialog = memo(function ModalDialog({
  toggleShow,
  triggerClose,
  title,
  size = "md",
  isCentered = true,
  closeOnOverlayClick = true,
  scrollBehavior = "inside",
  maxHeight = 500,
  children,
}) {
  const checkChild = (el, type) => {
    if (
      typeof el.find((child) => child.props.name === type) !== "undefined"
    ) {
      const element = el.find((child) => {
        return child.props.name === type
      })
      return element
    } else {
      return null
    }
  }

  const header = checkChild(children, "header")
  const headerComp = () => {
    if (title && header === null) {
      return title
    } else if (title && header !== null) {
      return title
    } else if (!title && header !== null) {
      return header
    } else {
      return "Title here"
    }
  }
  const footer = checkChild(children, "footer")
  const content = checkChild(children, "content")

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = useCallback(() => {
    onClose()
    triggerClose()
  }, [onClose, triggerClose])

  const checkShow = useCallback(() => {
    if (toggleShow) {
      onOpen()
    } else {
      onClose()
    }
  }, [toggleShow, onClose, onOpen])

  useEffect(() => {
    checkShow()
  }, [checkShow])

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          size={size}
          isCentered={isCentered}
          closeOnOverlayClick={closeOnOverlayClick}
          scrollBehavior={scrollBehavior}
        >
          <ModalOverlay />
          <ModalContent maxH={maxHeight}>
            <ModalHeader>{headerComp()}</ModalHeader>
            <ModalCloseButton />
            <ModalBody className={`${!footer && "tw-pb-5"}`}>
              {content && content}
            </ModalBody>

            {footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalContent>
        </Modal>
      )}
    </>
  )
});

export default ModalDialog
