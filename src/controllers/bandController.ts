import { Band } from '../models/bandModel'

const getBands = async (req: any, res: any): Promise<any> => {
  try {
    const queryObject = { ...req.query }
    const excludedFields = ['page', 'size', 'sort']
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    excludedFields.forEach((el) => delete queryObject[el])

    let query = Band.find(queryObject)

    // Query filtering
    if (req.query.sort !== null && req.query.sort !== undefined) {
      const sortBy = req.query.sort.split(',').join(' ')
      console.log(sortBy)
      query = query.sort(sortBy)
    } else {
      query = query.sort('-originYear')
    }

    // Query pagination
    const page = req.query.page !== null ? req.query.page * 1 : 1
    const size = req.query.size !== null ? req.query.size * 1 : 10
    const skip = (page - 1) * size

    query = query.skip(skip).limit(size)

    const numBands = await Band.countDocuments()

    if (req.query.page !== null) {
      if (skip >= numBands) throw new Error('This page does not exist')
    }

    const bands = await query

    res.status(200).json({
      status: 'success',
      data: {
        page,
        size,
        total: numBands,
        content: bands,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

const getBand = async (req: any, res: any): Promise<any> => {
  try {
    const band = await Band.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        band,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

const createBand = async (req: Request, res: any): Promise<any> => {
  try {
    const newBand = await Band.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        band: newBand,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

const updateBand = async (req: any, res: any): Promise<any> => {
  try {
    const updatedBand = await Band.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      data: {
        band: updatedBand,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

const deleteBand = async (req: any, res: any): Promise<any> => {
  try {
    await Band.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

export { getBands, getBand, createBand, updateBand, deleteBand }
