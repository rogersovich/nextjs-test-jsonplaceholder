import { Button } from "@chakra-ui/react"
import ModalDialog from "./modal.dialog"
import CsInput from "./cs.input"
import CsSelect from "./cs.select"
// form
import postCreateSchema from "../validation/post.create"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
// api
import { getUsers } from "../services/user"
import { createPosts } from "../services/post"
import { useQuery, useMutation } from "@tanstack/react-query"

const PostCreate = ({ isShow, toggleShow, onCreateSuccess, onCreateError, toggleLoading }) => {
  const {
    isLoading,
    isError,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUsers({
        _limit: 10,
      })
    },
  })

  function mapUserToOption(user) {
    return { value: user.id, label: user.name }
  }

  const options = (users || []).map(mapUserToOption)

  const initialValues = {
    title: null,
    body: null,
    userId: null,
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(postCreateSchema),
  })

  // create post
  const mutation = useMutation({
    mutationFn: (formData) => {
      toggleShow()
      toggleLoading()
      return createPosts(formData)
    },
    onSuccess: (data) => {
      onCreateSuccess(data)
    },
    onError: () => {
      onCreateError()
    },
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <ModalDialog
        toggleShow={isShow}
        triggerClose={toggleShow}
        size="lg"
        maxHeight="600"
        isCentered={true}
        closeOnOverlayClick={true}
      >
        <slot name="header">
          <div>Create Post</div>
        </slot>

        <slot name="content">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} id="my-form">
              <div className="tw-mb-3">
                <CsSelect
                  label="User"
                  placeholder="Pilih User"
                  errors={errors.userId}
                  control={control}
                  name={"userId"}
                  options={options}
                ></CsSelect>
              </div>
              <div className="tw-mb-3">
                <CsInput
                  label="Title"
                  placeholder="Masukan Title"
                  errors={errors.title}
                  register={{ ...register("title") }}
                />
              </div>
              <div className="tw-mb-3">
                <CsInput
                  label="Body"
                  placeholder="Masukan Body"
                  errors={errors.body}
                  register={{ ...register("body") }}
                />
              </div>
            </form>
          </div>
        </slot>

        <slot name="footer">
          <Button colorScheme="green" type="submit" form="my-form" px={8}>
            Submit
          </Button>
        </slot>
      </ModalDialog>
    </>
  )
}

export default PostCreate
