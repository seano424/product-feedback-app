export const handleChecked = (
  toCheck,
  setChecked,
  setOpenSortable,
  dispatch,
  action
) => {
  switch (toCheck) {
    case 'mostComments':
      setChecked({
        mostUpvotes: false,
        leastUpvotes: false,
        mostComments: true,
        leastComments: false,
      })
      setOpenSortable(false)
      dispatch(action())
      break
    case 'mostUpvotes':
      setChecked({
        mostUpvotes: true,
        leastUpvotes: false,
        mostComments: false,
        leastComments: false,
      })
      setOpenSortable(false)
      dispatch(action())
      break
    case 'leastComments':
      setChecked({
        mostUpvotes: false,
        leastUpvotes: false,
        mostComments: false,
        leastComments: true,
      })
      dispatch(action())
      setOpenSortable(false)
      break
    case 'leastUpvotes':
      setChecked({
        mostUpvotes: false,
        leastUpvotes: true,
        mostComments: false,
        leastComments: false,
      })
      dispatch(action())
      setOpenSortable(false)
      break
    default:
      break
  }
}

export const handleSortBy = (type, setSortBy, dispatch, setCategory) => {
  switch (type) {
    case 'all':
      setSortBy({
        all: true,
        ui: false,
        ux: false,
        enhancement: false,
        bug: false,
        feature: false,
      })
      dispatch(setCategory(type))
      break
    case 'ui':
      setSortBy({
        all: false,
        ui: true,
        ux: false,
        enhancement: false,
        bug: false,
        feature: false,
      })
      dispatch(setCategory(type))
      break
    case 'ux':
      setSortBy({
        all: false,
        ui: false,
        ux: true,
        enhancement: false,
        bug: false,
        feature: false,
      })
      dispatch(setCategory(type))
      break
    case 'enhancement':
      setSortBy({
        all: false,
        ui: false,
        ux: false,
        enhancement: true,
        bug: false,
        feature: false,
      })
      dispatch(setCategory(type))
      break
    case 'bug':
      setSortBy({
        all: false,
        ui: false,
        ux: false,
        enhancement: false,
        bug: true,
        feature: false,
      })
      dispatch(setCategory(type))
      break
    case 'feature':
      setSortBy({
        all: false,
        ui: false,
        ux: false,
        enhancement: false,
        bug: false,
        feature: true,
      })
      dispatch(setCategory(type))
      break
    default:
      break
  }
}
