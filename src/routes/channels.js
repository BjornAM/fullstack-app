import express from 'express'
export const router = express.Router()
const channelData = [{
  id: "1",
  name: "Knäböj",
  isLocked: true,
}]

router.get('/', (req, res) => {
	res.status(200).send(channelData)
})