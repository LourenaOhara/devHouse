import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

class ReserveController {
  // lista de reservas
  async index(req, res) {
    const { user_id } = req.headers;

    const reserves = await Reserve.find({ user: user_id }).populate('house');

    return res.json(reserves);
  }

  // realizar reserva
  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    // house_id incorreto ou inexistente
    const house = await House.findById(house_id);
    if (!house) {
      return res
        .status(400)
        .json({ error: `This house and house_id doesn't exist` });
    }

    // status da casa é diferente de true
    if (house.status !== true) {
      return res.status(400).json({ error: 'The house_id is other than true' });
    }

    // user_id é igual ao house.user (é o proprietário da casa)
    const user = await User.findById(user_id);
    if (String(user_id) === String(house.user)) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    const populatedReserve = await Reserve.findOne({ _id: reserve._id })
      .populate('user')
      .populate('house')
      .exec();

    return res.json(populatedReserve);
  }

  // cancela reserva
  async destroy(req, res) {
    const { reserve_id } = req.body;

    await Reserve.findByIdAndDelete({ _id: reserve_id });

    return res.json({ message: 'DELETED' });
  }
}

export default new ReserveController();
