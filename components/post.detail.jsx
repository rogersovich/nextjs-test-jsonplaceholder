import ModalDialog from "./modal.dialog"
import { getPost, getPostByUsers } from "../services/post"
import { useQuery } from "@tanstack/react-query"

const PostDetail = ({ isShow, toggleShow, id }) => {
  // get detail post api
  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => {
      return getPost(id)
    },
  })
  // get users api
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return getPostByUsers(id)
    },
  })

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
          <div className="tw-text-gray-600">Detail Post</div>
        </slot>
        <slot name="content">
          <div>
            {postQuery.isLoading || usersQuery.isLoading ? (
              <p>Loading...</p>
            ) : postQuery.isError || usersQuery.isError ? (
              <p>
                Error: {postQuery.error?.message || usersQuery.error?.message}
              </p>
            ) : (
              <>
                <div>
                 <div className="tw-text-[17px] bold capital">
                    {postQuery.data.title}
                  </div>
                  <div className="tw-text-[14px] tw-whitespace-break tw-mt-1">
                    {`${postQuery.data.body}`}
                  </div>
                </div>
                <br />
                <div>
                  <div className="tw-text-[17px] bold capital">Users who registered:</div>
                  <ul className="tw-text-[14px] tw-whitespace-break tw-mt-1">
                    {usersQuery.data.map((user) => (
                      <li key={user.id}>{user.email}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </slot>
        <slot name="footer"></slot>
      </ModalDialog>
    </>
  )
}

export default PostDetail
