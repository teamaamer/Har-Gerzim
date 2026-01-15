import client from './client';
import {
  CUSTOMER_CREATE_MUTATION,
  CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
  CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION,
  CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION,
  CUSTOMER_QUERY,
  CUSTOMER_UPDATE_MUTATION,
  CUSTOMER_RECOVER_MUTATION,
  CUSTOMER_ADDRESS_CREATE_MUTATION,
  CUSTOMER_ADDRESS_UPDATE_MUTATION,
  CUSTOMER_ADDRESS_DELETE_MUTATION,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE_MUTATION,
} from './customer-queries';

export interface CustomerCreateInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing?: boolean;
}

export interface CustomerLoginInput {
  email: string;
  password: string;
}

export interface CustomerUpdateInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing?: boolean;
}

export interface CustomerAddress {
  id?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing: boolean;
  createdAt: string;
  updatedAt: string;
  defaultAddress?: CustomerAddress;
  addresses: CustomerAddress[];
  orders: any[];
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export async function createCustomer(input: CustomerCreateInput) {
  try {
    const { data, errors } = await client.request(CUSTOMER_CREATE_MUTATION, {
      variables: { input },
    });

    if (errors || data?.customerCreate?.customerUserErrors?.length > 0) {
      const errorMessages = data?.customerCreate?.customerUserErrors?.map((e: any) => e.message) || [];
      throw new Error(errorMessages.join(', ') || 'Failed to create customer');
    }

    return data?.customerCreate?.customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

export async function loginCustomer(input: CustomerLoginInput): Promise<CustomerAccessToken> {
  try {
    const { data, errors } = await client.request(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
      variables: { input },
    });

    if (errors || data?.customerAccessTokenCreate?.customerUserErrors?.length > 0) {
      const errorMessages = data?.customerAccessTokenCreate?.customerUserErrors?.map((e: any) => e.message) || [];
      throw new Error(errorMessages.join(', ') || 'Failed to login');
    }

    return data?.customerAccessTokenCreate?.customerAccessToken;
  } catch (error) {
    console.error('Error logging in customer:', error);
    throw error;
  }
}

export async function renewCustomerAccessToken(accessToken: string): Promise<CustomerAccessToken> {
  try {
    const { data, errors } = await client.request(CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION, {
      variables: { customerAccessToken: accessToken },
    });

    if (errors || data?.customerAccessTokenRenew?.userErrors?.length > 0) {
      throw new Error('Failed to renew access token');
    }

    return data?.customerAccessTokenRenew?.customerAccessToken;
  } catch (error) {
    console.error('Error renewing access token:', error);
    throw error;
  }
}

export async function logoutCustomer(accessToken: string): Promise<boolean> {
  try {
    const { data, errors } = await client.request(CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION, {
      variables: { customerAccessToken: accessToken },
    });

    if (errors || data?.customerAccessTokenDelete?.userErrors?.length > 0) {
      throw new Error('Failed to logout');
    }

    return true;
  } catch (error) {
    console.error('Error logging out customer:', error);
    throw error;
  }
}

export async function getCustomer(accessToken: string): Promise<Customer | null> {
  try {
    const { data, errors } = await client.request(CUSTOMER_QUERY, {
      variables: { customerAccessToken: accessToken },
    });

    if (errors) {
      console.error('Shopify API errors:', errors);
      return null;
    }

    const customer = data?.customer;
    if (!customer) return null;

    return {
      ...customer,
      addresses: customer.addresses?.edges?.map((edge: any) => edge.node) || [],
      orders: customer.orders?.edges?.map((edge: any) => edge.node) || [],
    };
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
}

export async function updateCustomer(accessToken: string, input: CustomerUpdateInput) {
  try {
    const { data, errors } = await client.request(CUSTOMER_UPDATE_MUTATION, {
      variables: {
        customerAccessToken: accessToken,
        customer: input,
      },
    });

    if (errors || data?.customerUpdate?.customerUserErrors?.length > 0) {
      const errorMessages = data?.customerUpdate?.customerUserErrors?.map((e: any) => e.message) || [];
      throw new Error(errorMessages.join(', ') || 'Failed to update customer');
    }

    return data?.customerUpdate?.customer;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
}

export async function recoverCustomerPassword(email: string): Promise<boolean> {
  try {
    const { data, errors } = await client.request(CUSTOMER_RECOVER_MUTATION, {
      variables: { email },
    });

    if (errors || data?.customerRecover?.customerUserErrors?.length > 0) {
      const errorMessages = data?.customerRecover?.customerUserErrors?.map((e: any) => e.message) || [];
      throw new Error(errorMessages.join(', ') || 'Failed to send recovery email');
    }

    return true;
  } catch (error) {
    console.error('Error recovering password:', error);
    throw error;
  }
}

export async function createCustomerAddress(accessToken: string, address: CustomerAddress) {
  try {
    const { data, errors } = await client.request(CUSTOMER_ADDRESS_CREATE_MUTATION, {
      variables: {
        customerAccessToken: accessToken,
        address,
      },
    });

    if (errors || data?.customerAddressCreate?.customerUserErrors?.length > 0) {
      const errorMessages = data?.customerAddressCreate?.customerUserErrors?.map((e: any) => e.message) || [];
      throw new Error(errorMessages.join(', ') || 'Failed to create address');
    }

    return data?.customerAddressCreate?.customerAddress;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
}

export async function updateCustomerAddress(accessToken: string, addressId: string, address: CustomerAddress) {
  try {
    const { data, errors } = await client.request(CUSTOMER_ADDRESS_UPDATE_MUTATION, {
      variables: {
        customerAccessToken: accessToken,
        id: addressId,
        address,
      },
    });

    if (errors || data?.customerAddressUpdate?.customerUserErrors?.length > 0) {
      const errorMessages = data?.customerAddressUpdate?.customerUserErrors?.map((e: any) => e.message) || [];
      throw new Error(errorMessages.join(', ') || 'Failed to update address');
    }

    return data?.customerAddressUpdate?.customerAddress;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
}

export async function deleteCustomerAddress(accessToken: string, addressId: string): Promise<boolean> {
  try {
    const { data, errors } = await client.request(CUSTOMER_ADDRESS_DELETE_MUTATION, {
      variables: {
        customerAccessToken: accessToken,
        id: addressId,
      },
    });

    if (errors || data?.customerAddressDelete?.customerUserErrors?.length > 0) {
      throw new Error('Failed to delete address');
    }

    return true;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
}

export async function setDefaultAddress(accessToken: string, addressId: string): Promise<boolean> {
  try {
    const { data, errors } = await client.request(CUSTOMER_DEFAULT_ADDRESS_UPDATE_MUTATION, {
      variables: {
        customerAccessToken: accessToken,
        addressId,
      },
    });

    if (errors || data?.customerDefaultAddressUpdate?.customerUserErrors?.length > 0) {
      throw new Error('Failed to set default address');
    }

    return true;
  } catch (error) {
    console.error('Error setting default address:', error);
    throw error;
  }
}
