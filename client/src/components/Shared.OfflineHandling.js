import React from 'react';
import styled from 'styled-components';
import Checkbox from './Shared.Checkbox';

export default ({ offline, offlineAccess, setOfflineAccess }) => (
    <OfflineAccess>
        <Checkbox
            disabled={offline}
            checked={offlineAccess}
            onChange={() => {
                const updatedOfflineAccess = !offlineAccess;
                if (updatedOfflineAccess) {
                    navigator.serviceWorker.register('/service-worker.js');
                } else {
                    navigator.serviceWorker
                        .getRegistrations()
                        .then(function(registrations) {
                            for (let registration of registrations) {
                                registration.unregister();
                            }
                        });
                }
                setOfflineAccess(updatedOfflineAccess);
            }}
        >
            Enable offline access
        </Checkbox>
    </OfflineAccess>
);

const OfflineAccess = styled.div`
    text-align: right;
    padding-right: 1rem;
`;
