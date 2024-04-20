import { Band } from '../models/bandModel'

const getBands = async (_req: Request, res: any): Promise<any> => {
  try {
    const bands = await Band.find({})

    res.status(200).json({
      status: 'success',
      data: {
        bands,
      },
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: err,
    })
  }
}

const getBand = async (req: any, res: any): Promise<any> => {
  try {
    const band = await Band.findOne({ _id: req.params.id })

    if (band != null) {
      res.status(200).json({
        status: 'success',
        data: {
          band,
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Entity not found.',
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: err,
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
      status: 'error',
      data: err,
    })
  }
}

export { getBands, getBand, createBand }
