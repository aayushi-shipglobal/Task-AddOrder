

export const ErrorMessage = ({apiError}:{apiError:string}) => {
  return (
    <div><p className="text-center text-red-500 mt-5">{apiError}</p></div>
  )
}
