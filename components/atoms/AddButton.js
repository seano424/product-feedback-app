import Plus from 'public/assets/shared/icon-plus.svg'

function AddButton() {
  return (
    <div className="flex items-center space-x-2 text-white bg-primary p-2 rounded-lg">
      <Plus />
      <h3>Add Feedback</h3>
    </div>
  )
}

export default AddButton
