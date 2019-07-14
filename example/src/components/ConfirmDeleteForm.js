/** @jsx jsx */
import {jsx, Flex, Box, Styled} from 'theme-ui'
import Button from './Button'

const ConfirmDeleteForm = ({confirmDelete, onClickOutside}) => {
  return (
    <Flex sx={{flexDirection: 'column'}}>
      <Styled.h4>Are you sure?</Styled.h4>
      <Box>
        <span>This action cannot be undone</span>
      </Box>
      <Flex style={{alignItems: 'center'}}>
        <Box>
          <Button type="button" onClick={onClickOutside}>
            Cancel
          </Button>
        </Box>
        <Box>
          <Button type="button" onClick={confirmDelete}>
            Delete
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default ConfirmDeleteForm
