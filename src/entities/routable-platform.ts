import { BigintIsh, ChainId, defaultSwapFee, FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS, _30 } from '../constants'

const UNISWAP_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
const SUSHISWAP_FACTORY_ADDRESS = '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac'
const HONEYSWAP_FACTORY_ADDRESS = '0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7'
const BAOSWAP_FACTORY_ADDRESS = '0x45de240fbe2077dd3e711299538a09854fae9c9b'

const UNISWAP_ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const SUSHISWAP_ROUTER_ADDRESS = '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'
const HONEYSWAP_ROUTER_ADDRESS = '0x1C232F01118CB8B424793ae03F870aa7D0ac7f77'
const BAOSWAP_ROUTER_ADDRESS = '0x6093AeBAC87d62b1A5a4cEec91204e35020E38bE'

/**
 * A platform to which Swapr can route through.
 */
export class RoutablePlatform {
  public readonly name: string
  public readonly factoryAddress: { [supportedChainId in ChainId]?: string }
  public readonly routerAddress: { [supportedChainId in ChainId]?: string }
  public readonly initCodeHash: string
  public readonly defaultSwapFee: BigintIsh

  public static readonly SWAPR = new RoutablePlatform(
    'Swapr',
    FACTORY_ADDRESS,
    ROUTER_ADDRESS,
    INIT_CODE_HASH,
    defaultSwapFee
  )
  public static readonly UNISWAP = new RoutablePlatform(
    'Uniswap',
    { [ChainId.MAINNET]: UNISWAP_FACTORY_ADDRESS, [ChainId.RINKEBY]: UNISWAP_FACTORY_ADDRESS },
    { [ChainId.MAINNET]: UNISWAP_ROUTER_ADDRESS, [ChainId.RINKEBY]: UNISWAP_ROUTER_ADDRESS },
    '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    _30
  )
  public static readonly SUSHISWAP = new RoutablePlatform(
    'Sushiswap',
    { [ChainId.MAINNET]: SUSHISWAP_FACTORY_ADDRESS, [ChainId.RINKEBY]: SUSHISWAP_FACTORY_ADDRESS },
    { [ChainId.MAINNET]: SUSHISWAP_ROUTER_ADDRESS, [ChainId.RINKEBY]: SUSHISWAP_ROUTER_ADDRESS },
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    _30
  )
  public static readonly HONEYSWAP = new RoutablePlatform(
    'Honeyswap',
    { [ChainId.XDAI]: HONEYSWAP_FACTORY_ADDRESS },
    { [ChainId.XDAI]: HONEYSWAP_ROUTER_ADDRESS },
    '0x3f88503e8580ab941773b59034fb4b2a63e86dbc031b3633a925533ad3ed2b93',
    _30
  )
  public static readonly BAOSWAP = new RoutablePlatform(
    'Baoswap',
    { [ChainId.XDAI]: BAOSWAP_FACTORY_ADDRESS },
    { [ChainId.XDAI]: BAOSWAP_ROUTER_ADDRESS },
    '0x0bae3ead48c325ce433426d2e8e6b07dac10835baec21e163760682ea3d3520d',
    _30
  )

  public constructor(
    name: string,
    factoryAddress: { [supportedChainId in ChainId]?: string },
    routerAddress: { [supportedChainId in ChainId]?: string },
    initCodeHash: string,
    defaultSwapFee: BigintIsh
  ) {
    this.name = name
    this.factoryAddress = factoryAddress
    this.routerAddress = routerAddress
    this.initCodeHash = initCodeHash
    this.defaultSwapFee = defaultSwapFee
  }

  public supportsChain(chainId: ChainId): boolean {
    return !!this.factoryAddress[chainId]
  }
}
